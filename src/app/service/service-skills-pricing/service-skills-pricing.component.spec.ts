import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSkillsPricingComponent } from './service-skills-pricing.component';

describe('ServiceSkillsPricingComponent', () => {
  let component: ServiceSkillsPricingComponent;
  let fixture: ComponentFixture<ServiceSkillsPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceSkillsPricingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceSkillsPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
