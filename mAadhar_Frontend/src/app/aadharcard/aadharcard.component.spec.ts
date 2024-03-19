import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AadharcardComponent } from './aadharcard.component';

describe('AadharcardComponent', () => {
  let component: AadharcardComponent;
  let fixture: ComponentFixture<AadharcardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AadharcardComponent]
    });
    fixture = TestBed.createComponent(AadharcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
